using System;
using System.Web.Http;
using System.Data.SqlClient;
using System.Threading;
using System.Net.Http;
using System.Net;
using System.Collections.Generic;
using NUnit.Framework;
using Rhino.Mocks;
using Model.Services.Interfaces;
using Model.Exceptions;
using Model.DataTransfer;
using SofomoTracker.Controllers.Api;

namespace Model.Tests.Controllers
{
    [TestFixture]
    public class GeolocationApiControllerTests
    {
        private IGeolocationApiService _mockGeolocationApiService;
        private IGeolocationService _mockGeolocationService;
        private GeolocationApiController _geolocationController;

        [SetUp]
        public void SetUp()
        {
            _mockGeolocationApiService = MockRepository.GenerateMock<IGeolocationApiService>();
            _mockGeolocationService = MockRepository.GenerateMock<IGeolocationService>();
            _geolocationController = new GeolocationApiController(_mockGeolocationApiService, _mockGeolocationService);
            _geolocationController.Configuration = new HttpConfiguration();
            _geolocationController.Request = new HttpRequestMessage();
        }

        [TearDown]
        public void TearDown()
        {
            _mockGeolocationApiService.VerifyAllExpectations();
            _mockGeolocationService.VerifyAllExpectations();

        }

        [Test]
        public void GetGeolocationDataInternalServerErrorMessageOnDatabaseError()
        {
            _mockGeolocationService.Expect(x => x.GetAllGeolocationDtos()).Throw(MockSqlException()).Repeat.Once();
            var response = _geolocationController.GetGeolocationData().ExecuteAsync(CancellationToken.None).Result;
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.InternalServerError));
            Assert.IsFalse(response.IsSuccessStatusCode);
        }

        [Test]
        public void InsertGeolocationBadRequestOnNoResults()
        {
            var query = new InsertGeolocationQuery { IpUrlQuery = "bad.query.com" };
            var geoEx = new GeolocationNotFoundException("No data found");
            var aggregateEx = new AggregateException("Errors", new List<Exception> { geoEx });

            _mockGeolocationApiService.Expect(x => x.GetGeolocationByIpOrUrl(Arg<string>.Is.Equal(query.IpUrlQuery)))
                .Throw(aggregateEx).Repeat.Once();
            var response = _geolocationController.InsertGeolocationFromApi(query).ExecuteAsync(CancellationToken.None).Result;
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            Assert.IsFalse(response.IsSuccessStatusCode);
        }

        private static SqlException MockSqlException()
        {
            try
            {
                var bogusConn = new SqlConnection("Data Source=localhost;Initial Catalog = myDataBase;User Id = myUsername;Password = myPassword;Connection Timeout = 1");
                bogusConn.Open();
                return null;
            }
            catch (SqlException e)
            {
                return e;
            }
        }
    }
}
