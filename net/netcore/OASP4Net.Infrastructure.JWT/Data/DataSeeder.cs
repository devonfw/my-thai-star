using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OASP4Net.Infrastructure.JWT.Data
{
  public class DataSeeder
  {
    private readonly AuthContext _ctx;
    private readonly UserManager<ApplicationUser> _userManager;

    public DataSeeder(AuthContext ctx, UserManager<ApplicationUser> userManager)
    {
      _ctx = ctx;
      _userManager = userManager;
    }

    public async Task SeedAsync()
    {
      _ctx.Database.EnsureCreated();

        if (!_ctx.Users.Any())
        {

            var user = new ApplicationUser()
            {
                Email = "waiter@mts.com",
                UserName = "waiter"
            };

            var result = await _userManager.CreateAsync(user, "*Dev0nMts2017");
            if (result.Succeeded)
            {
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
            }

            user = new ApplicationUser()
            {
                Email = "customer@mts.com",
                UserName = "user0"
            };

            result = await _userManager.CreateAsync(user, "*Dev0nMts2017");
            if (result.Succeeded)
            {
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
            }
        }
    }
  }
}
