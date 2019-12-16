using System;
using Model.DataAccess;
using Model.DataAccess.Interfaces;
using Model.DataTransfer;
using Model.Services.Interfaces;

namespace Model.Services
{
    public class AppConfigurationService : IAppConfigurationService
    {
        private readonly IAppConfigurationDao _appConfigurationDao;

        public AppConfigurationService(IAppConfigurationDao appConfigurationDao)
        {
            _appConfigurationDao = appConfigurationDao;
        }

        public AppConfigurationService() : this(new AppConfigurationDao())
        {
        }

        public AppConfigurationDto GetAppConfigurationByKey(string key)
        {
            var appConfig = _appConfigurationDao.GetAppConfigurationByKey(key);
            if (appConfig == null)
            {
                throw new Exception($"No configuration found for key {key}");
            }
            return appConfig;
        }
    }
}
