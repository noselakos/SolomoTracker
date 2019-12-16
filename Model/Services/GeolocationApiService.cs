using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Model.Constants;
using Model.Services.Interfaces;
using Model.Domain;
using Model.Exceptions;

namespace Model.Services
{
    public class GeolocationApiService : IGeolocationApiService
    {
        private readonly IAppConfigurationService _appConfigurationService;

        public GeolocationApiService(IAppConfigurationService appConfigurationService)
        {
            _appConfigurationService = appConfigurationService;
        }

        public GeolocationApiService() : this(new AppConfigurationService())
        {
        }

        public async Task<Geolocation> GetGeolocationByIpOrUrl(string query)
        {
            var fullUrl = BuildIpStackUrl(query);

            using (HttpClient client = new HttpClient())
            using (HttpResponseMessage response = await client.GetAsync(fullUrl).ConfigureAwait(false))
            using (HttpContent content = response.Content)
            {
                var result = await content.ReadAsStringAsync();
                var contractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy()
                };
                var jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = contractResolver,
                    Formatting = Formatting.Indented
                };
                var geolocation = JsonConvert.DeserializeObject<Geolocation>(result, jsonSerializerSettings);

                if (geolocation.IsPopulated())
                {
                    return geolocation;
                }

                // No geolocation data, attempt to deserialize message from api to discover the reason
                var apiMessage = JsonConvert.DeserializeObject<GeoApiMessage>(result, jsonSerializerSettings);
                if (apiMessage.IsPopulated())
                {
                    throw new GeolocationNotFoundException(apiMessage.Error.Info);
                }

                // No message, probably bad data, just throw an exception with a generic message
                throw new GeolocationNotFoundException("No data found");
            }
        }

        private string BuildIpStackUrl(string query)
        {
            var baseUrl = ApiNames.ApiBaseUrl;
            var secretKeyConfig = _appConfigurationService.GetAppConfigurationByKey(ApiNames.ApiAccessKeyName);
            return $"{baseUrl}{query}?access_key={secretKeyConfig.Value}";
        }
    }
}
