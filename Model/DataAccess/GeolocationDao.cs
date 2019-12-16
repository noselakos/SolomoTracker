using System.Collections.Generic;
using System.Linq;
using Model.DataTransfer;
using Model.DataAccess.Interfaces;
using System;

namespace Model.DataAccess
{
    public class GeolocationDao : IGeolocationDao
    {
        public List<GeolocationDto> GetAllGeolocationDtos()
        {
            using (var context = new DatabaseContext())
            {
                var domain = AppDomain.CurrentDomain.BaseDirectory;
                return context.GeolocationSet.OrderByDescending(x => x.GeolocationId).ToList();
            }
        }

        public int InsertGeolocation(GeolocationDto geolocation)
        {
            using (var context = new DatabaseContext())
            {
                context.GeolocationSet.Add(geolocation);
                context.SaveChanges();

                return geolocation.GeolocationId;
            }
        }

        public void DeleteGeolocation(int geolocationId)
        {
            using (var context = new DatabaseContext())
            {
                var tempGeo = new GeolocationDto { GeolocationId = geolocationId };
                context.GeolocationSet.Attach(tempGeo);
                context.GeolocationSet.Remove(tempGeo);
                context.SaveChanges();
            }
        }
    }
}
