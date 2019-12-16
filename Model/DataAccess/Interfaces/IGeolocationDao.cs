using System.Collections.Generic;
using Model.DataTransfer;

namespace Model.DataAccess.Interfaces
{
    public interface IGeolocationDao
    {
        void DeleteGeolocation(int geolocationId);
        List<GeolocationDto> GetAllGeolocationDtos();
        int InsertGeolocation(GeolocationDto geolocation);
    }
}