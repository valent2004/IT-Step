using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using WebValik.Data;
using WebValik.Models.Product;

namespace WebValik.Controllers
{
    public class ProductsController : Controller
    {
        private readonly AppValikDbContext _dbContext;
        private readonly IMapper _mapper;
        //DI - Depencecy Injection
        public ProductsController(AppValikDbContext context, IMapper mapper)
        {
            _dbContext = context;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            List<ProductItemViewModel> model = _dbContext.Products
                .ProjectTo<ProductItemViewModel>(_mapper.ConfigurationProvider)
                .ToList();
            return View(model);
        }
    }
}
