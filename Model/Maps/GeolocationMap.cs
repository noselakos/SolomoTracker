using System.Data.Entity.ModelConfiguration;
using Model.DataTransfer;
using Model.Constants;

namespace Model.Maps
{
    public class GeolocationMap : EntityTypeConfiguration<GeolocationDto>
    {
        public GeolocationMap()
        {
            ToTable(TableNames.GeolocationTableName);

            Property(p => p.GeolocationId).IsRequired();
            Property(p => p.Ip).IsRequired();
            Property(p => p.ContinentCode).IsRequired();
            Property(p => p.ContinentName).IsRequired();
            Property(p => p.CountryCode).IsRequired();
            Property(p => p.CountryName).IsRequired();
            Property(p => p.RegionCode).IsRequired();
            Property(p => p.RegionName).IsRequired();
            Property(p => p.City).IsRequired();
            Property(p => p.Zip);
            Property(p => p.Latitude);
            Property(p => p.Longitude);
        }
    }
}
