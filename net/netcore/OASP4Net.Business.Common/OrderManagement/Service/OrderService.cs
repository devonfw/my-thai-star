using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OASP4Net.Business.Common.OrderManagement.DataType;
using OASP4Net.Business.Common.OrderManagement.Dto;
using OASP4Net.Domain.Entities;
using OASP4Net.Domain.Entities.Models;
using OASP4Net.Domain.UnitOfWork.Service;
using OASP4Net.Domain.UnitOfWork.UnitOfWork;

namespace OASP4Net.Business.Common.OrderManagement.Service
{
    public class OrderService : Service<ModelContext>, IOrderService
    {
        public OrderService(IUnitOfWork<ModelContext> uoW, IMapper mapper) : base(uoW)
        {
        }

        public void OrderTheOrder(string bookingToken, IList<OrderlineDto> orderLines)
        {
            var bookingtype = bookingToken.StartsWith("CB") ? OrderTypeEnum.CommonBooking : OrderTypeEnum.GuestBooking;
            var booking = GetBooking(bookingToken);
            if (booking == null) throw new Exception("No booking");
            var orders = UoW.Repository<Order>().GetAll(o => o.IdReservation == booking.Id || o.IdInvitationGuest == booking.Id);
            var order = orders != null ? orders.FirstOrDefault() : new Order();

            switch (bookingtype)
            {
                case OrderTypeEnum.CommonBooking:

                    order = new Order { IdReservation = booking.Id };
                    break;
                case OrderTypeEnum.GuestBooking:
                    order = new Order { IdInvitationGuest = booking.Id };
                    break;

            }
            UoW.Repository<Order>().Create(order);
            UoW.Commit();

            var orderLinesList = CreateOrderLines(order.Id, orderLines);
            CreateOrderExtraIngredient(orderLinesList);

        }

        private List<KeyValuePair<OrderLine, List<Extra>>> CreateOrderLines(long orderId, IList<OrderlineDto> orderLines)
        {
            var result = new List<KeyValuePair<OrderLine, List<Extra>>>();
            foreach (var orderItem in orderLines)
            {
                var orderline = new OrderLine
                {
                    IdOrder = orderId,
                    Amount = orderItem.orderLine.amount,
                    IdDish = orderItem.orderLine.dishId,
                    Comment = orderItem.orderLine.comment
                };

                UoW.Repository<OrderLine>().Create(orderline);
                if (orderItem.extras.Any()) result.Add(new KeyValuePair<OrderLine, List<Extra>>(orderline, orderItem.extras.ToList()));
            }

            UoW.Commit();
            return result;
        }

        private void CreateOrderExtraIngredient(IList<KeyValuePair<OrderLine, List<Extra>>> orderLinesItems)
        {
            foreach (var orderLine in orderLinesItems)
            {
                foreach (var extra in orderLine.Value)
                {
                    UoW.Repository<OrderDishExtraIngredient>().Create(new OrderDishExtraIngredient
                    {
                        IdIngredient = extra.id,
                        IdOrderLine = orderLine.Key.Id
                    });
                }
            }
            UoW.Commit();
        }

        private Booking GetBooking(string bookingToken)
        {
            return UoW.Repository<Booking>().Get(b => b.ReservationToken == bookingToken);
        }
    }

}
