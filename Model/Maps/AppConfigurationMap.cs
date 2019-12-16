using Model.DataTransfer;
using Model.Constants;
using System.Data.Entity.ModelConfiguration;

namespace Model.Maps
{
    class AppConfigurationMap : EntityTypeConfiguration<AppConfigurationDto>
    {
        public AppConfigurationMap()
        {
            ToTable(TableNames.AppConfigurationTableName);

            Property(p => p.Key).IsRequired();
            Property(p => p.Value).IsRequired();
        }
    }
}
