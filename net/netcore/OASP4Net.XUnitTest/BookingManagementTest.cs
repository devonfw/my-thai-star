using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Moq;
using OASP4Net.Test.Model;
using Xunit;

namespace OASP4Net.XUnitTest
{
    public class BookingManagementTest : BaseManagementTest
    {
        
        /// <summary>
        /// This test is going to be deleted. It only proves the connection with SQLite.
        /// </summary>
        [Fact]
        public void PassingTest()
        {
            var dishes = Context.Dish.FromSql("SELECT * from Dish").ToList();
            Console.WriteLine(dishes.Count);
            Assert.Equal(6, dishes.Count);           
        }

        [Fact]
        public void OrderAnOrderBookingNotExist()
        {
            //todo
        }
    }
}
