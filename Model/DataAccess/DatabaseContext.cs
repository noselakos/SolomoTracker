using Model.DataTransfer;
using Model.Exceptions;
using Model.Maps;
using System;
using System.Configuration;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;

namespace Model.DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DbSet<AppConfigurationDto> AppConfigurationSet { get; set; }
        public DbSet<GeolocationDto> GeolocationSet { get; set; }

        public DatabaseContext() : base(GetConnection(), false)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory;
            AppDomain.CurrentDomain.SetData("DataDirectory", path);
        }

        public static DbConnection GetConnection()
        {
            var connection = ConfigurationManager.ConnectionStrings["SQLiteConnection"];
            var factory = DbProviderFactories.GetFactory(connection.ProviderName);
            var dbCon = factory.CreateConnection();
            dbCon.ConnectionString = connection.ConnectionString;
            return dbCon;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Configurations.Add(new AppConfigurationMap());
            modelBuilder.Configurations.Add(new GeolocationMap());
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                var formattedException = new FormattedDbEntityValidationException(e);
                throw formattedException;
            }
        }
    }
}
