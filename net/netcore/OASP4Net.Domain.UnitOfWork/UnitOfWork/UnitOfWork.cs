using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OASP4Net.Domain.UnitOfWork.Repository;

namespace OASP4Net.Domain.UnitOfWork.UnitOfWork
{

    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext

    {
        public IDictionary<Type, object> Repositories { get; set; }

        private bool Disposed { get; set; }
        private DbContext Context { get; }

        public UnitOfWork(TContext context)
        {
            Context = context;
            Repositories = new Dictionary<Type, object>();
        }

        public IRepository<T> Repository<T>() where T : class
        {
            if (Repositories.Keys.Contains(typeof(T)))
            {
                return Repositories[typeof(T)] as IRepository<T>;
            }

            IRepository<T> repository = new Repository<T>(Context);
            Repositories.Add(typeof(T), repository);
            return repository;
        }


        #region async methods

        public async Task<int> CommitAsync()
        {
            int result;
            var transaction = await Context.Database.BeginTransactionAsync();
            {
                try
                {
                    result = await Context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                    throw;
                }

            }
            return result;
        }



        #endregion

        #region sync methods

        public int Commit()
        {
            int result;

            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    result = Context.SaveChanges();
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                    throw;
                }

            }
            return result;
        }

        #endregion

        #region dispose

        public void Dispose()
        {
            Dispose(true);
            //GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (Disposed) return;
            if (disposing)
            {
                try
                {
                    Context?.Dispose();
                }
                catch (ObjectDisposedException)
                {
                    // do nothing, the objectContext has already been disposed
                }
            }

            Disposed = true;
        }

        #endregion

        #region rollback

        public void Rollback()
        {
            Context
                .ChangeTracker
                .Entries()
                .ToList()
                .ForEach(x => x.Reload());
        }

        #endregion
    }
}
