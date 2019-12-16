using System.Collections.Generic;
using Model.DataAccess;
using Model.DataAccess.Interfaces;
using Model.DataTransfer;
using Model.Services.Interfaces;

namespace Model.Services
{
    public class GeolocationService : IGeolocationService
    {
        private readonly IGeolocationDao _geolocationDao;
        public GeolocationService(IGeolocationDao geolocationDao)
        {
            _geolocationDao = geolocationDao;
        }

        public GeolocationService() : this(new GeolocationDao())
        {
        }

        public int InsertGeolocation(GeolocationDto geolocation)
        {
            return _geolocationDao.InsertGeolocation(geolocation);
        }

        public List<GeolocationDto> GetAllGeolocationDtos()
        {
            return _geolocationDao.GetAllGeolocationDtos();
        }

        public void DeleteGeolocation(int geolocationId)
        {
            _geolocationDao.DeleteGeolocation(geolocationId);
        }
    }
}
