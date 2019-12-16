using System.Threading.Tasks;
using Model.Domain;

namespace Model.Services.Interfaces
{
    public interface IGeolocationApiService
    {
        Task<Geolocation> GetGeolocationByIpOrUrl(string query);
    }
}