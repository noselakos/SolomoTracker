using System.Collections.Generic;
using Model.DataTransfer;

namespace Model.Services.Interfaces
{
    public interface IGeolocationService
    {
        void DeleteGeolocation(int geolocationId);
        List<GeolocationDto> GetAllGeolocationDtos();
        int InsertGeolocation(GeolocationDto geolocation);
    }
}