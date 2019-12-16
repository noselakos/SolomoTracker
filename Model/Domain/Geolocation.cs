using Model.DataTransfer;

namespace Model.Domain
{
    public class Geolocation
    {
        public string Ip { get; set; }
        public string Type { get; set; }
        public string ContinentCode { get; set; }
        public string ContinentName { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public bool IsPopulated()
        {
            var props = GetType().GetProperties();
            foreach (var prop in props)
            {
                if (prop.Name == "Zip" || prop.Name == "Latitude" || prop.Name == "Longitude") continue;
                if (prop.GetValue(this) == null)
                {
                    return false;
                }
            }
            return true;
        }

        public GeolocationDto FromDomain()
        {
            return new GeolocationDto
            {
                Ip = Ip,
                Type = Type,
                ContinentCode = ContinentCode,
                ContinentName = ContinentName,
                CountryCode = CountryCode,
                CountryName = CountryName,
                RegionCode = RegionCode,
                RegionName = RegionName,
                City = City,
                Zip = Zip,
                Latitude = Latitude,
                Longitude = Longitude
            };
        }
    }
}
