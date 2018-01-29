using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OASP4Net.Domain.UnitOfWork.Repository
{
    /// <summary>
    ///     https://docs.microsoft.com/en-us/ef/core/querying/related-data
    ///     Lazy loading is not yet supported by EF Core. You can view the lazy loading item on our backlog to track this
    ///     feature.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Repository<T> : IRepository<T> where T : class
    {
        private DbContext Context { get; }
        protected DbSet<T> DbSet;

        public Repository(DbContext context)
        {
            Context = context;
            DbSet = context.Set<T>();
        }

        #region sync methods
        public IList<T> GetAll(Expression<Func<T, bool>> predicate = null)
        {
            return null != predicate ? DbSet.Where(predicate).ToList() : DbSet.AsEnumerable().ToList();
        }

        public IList<T> GetAllInclude(IList<string> include, Expression<Func<T, bool>> predicate = null)
        {
            return DbSetWithProperties(include, predicate).AsEnumerable().ToList();
        }

        public T Get(Expression<Func<T, bool>> predicate = null)
        {
            return null != predicate ? DbSet.FirstOrDefault(predicate) : DbSet.FirstOrDefault();
        }

        public T Create(T entity)
        {
            return DbSet.Add(entity).Entity;
        }

        public void Delete(T entity)
        {
            if (Context.Entry(entity).State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            DbSet.Remove(entity);
        }

        public void DeleteById(object id)
        {
            var entityToDelete = DbSet.Find(id);
            DbSet.Remove(entityToDelete);
        }

        public void Delete(Expression<Func<T, bool>> where)
        {
            var objects = DbSet.Where(where).AsEnumerable();
            foreach (var item in objects)
                DbSet.Remove(item);
        }

        //public void Save()
        //{
        //    Context.SaveChanges();
        //}

        public void Edit(T entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
        }

        public T FirstOrDefault(Expression<Func<T, bool>> where = null)
        {
            return DbSet.FirstOrDefault(where);
        }
        #endregion


        #region async methods
        public async Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null)
        {
            return predicate != null
                ? await DbSet.Where(predicate).ToAsyncEnumerable().ToList()
                : await DbSet.ToAsyncEnumerable().ToList();            
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate = null)
        {
            return predicate != null
                ? await DbSet.Where(predicate).FirstOrDefaultAsync()
                : await DbSet.FirstOrDefaultAsync();
        }

        public async Task<IList<T>> GetAllIncludeAsync(IList<string> include, Expression<Func<T, bool>> predicate = null)
        {
            return await DbSetWithProperties(include, predicate).ToAsyncEnumerable().ToList();
        }

        private IQueryable<T> DbSetWithProperties(IList<string> properties, Expression<Func<T, bool>> predicate = null)
        {
            IQueryable<T> queryable = predicate != null ? DbSet.Where(predicate) : DbSet;
            return properties.Aggregate(queryable, (current, property) => current.Include(property));
        }
        #endregion


    }
}