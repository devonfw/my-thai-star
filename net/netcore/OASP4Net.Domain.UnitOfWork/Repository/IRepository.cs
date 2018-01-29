using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OASP4Net.Domain.UnitOfWork.Repository
{
    public interface IRepository<T>
    {
        IList<T> GetAll(Expression<Func<T, bool>> predicate = null);
        T Get(Expression<Func<T, bool>> predicate = null);

        IList<T> GetAllInclude(IList<string> include, Expression<Func<T, bool>> predicate = null);

        T Create(T entity);
        void Delete(T entity);
        void DeleteById(object id);
        void Delete(Expression<Func<T, bool>> where);
        //void Save();
        void Edit(T entity);

        Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null);
        Task<T> GetAsync(Expression<Func<T, bool>> predicate = null);
        Task<IList<T>> GetAllIncludeAsync(IList<string> include, Expression<Func<T, bool>> predicate = null);

    }
}