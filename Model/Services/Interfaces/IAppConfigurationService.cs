using Model.DataTransfer;

namespace Model.Services.Interfaces
{
    public interface IAppConfigurationService
    {
        AppConfigurationDto GetAppConfigurationByKey(string key);
    }
}