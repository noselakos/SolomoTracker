using Model.DataTransfer;

namespace Model.DataAccess.Interfaces
{
    public interface IAppConfigurationDao
    {
        AppConfigurationDto GetAppConfigurationByKey(string key);
    }
}