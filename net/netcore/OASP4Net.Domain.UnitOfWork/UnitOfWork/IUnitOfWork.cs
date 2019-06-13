using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OASP4Net.Domain.UnitOfWork.Repository;

namespace OASP4Net.Domain.UnitOfWork.UnitOfWork
{
    public interface IUnitOfWork<TContext> : IDisposable where TContext : DbContext
    {
        int Commit();
        Task<int> CommitAsync();
        IRepository<T> Repository<T>() where T : class;
    }
}
