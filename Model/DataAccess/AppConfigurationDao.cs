using System.Linq;
using Model.DataTransfer;
using Model.DataAccess.Interfaces;

namespace Model.DataAccess
{
    public class AppConfigurationDao : IAppConfigurationDao
    {
        public AppConfigurationDto GetAppConfigurationByKey(string key)
        {
            using (var context = new DatabaseContext())
            {
                return context.AppConfigurationSet.FirstOrDefault(x => x.Key == key);
            }
        }
    }
}
