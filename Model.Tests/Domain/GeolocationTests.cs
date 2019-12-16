using Model.Domain;
using NUnit.Framework;

namespace Model.Tests.Domain
{
    [TestFixture]
    public class GeolocationTests
    {
        [Test]
        public void GeolocationIsPopulatedTest()
        {
            var populatedGeo = new Geolocation
            {
                Ip = "asd",
                ContinentCode = "asd",
                ContinentName = "asd",
                CountryCode = "asd",
                CountryName = "asd",
                RegionCode = "asd",
                RegionName = "asd",
                City = "asd",
                Zip = "asd",
                Type = "asd",
                Latitude = 0.9999,
                Longitude = 0.9999
            };
            var isPopulated = populatedGeo.IsPopulated();
            Assert.That(isPopulated, Is.True);
        }

        [Test]
        public void GeolocationIsNotPopulatedTest()
        {
            var unpopulatedGeo = new Geolocation();
            var isPopulated = unpopulatedGeo.IsPopulated();
            Assert.That(isPopulated, Is.False);
        }
    }
}
