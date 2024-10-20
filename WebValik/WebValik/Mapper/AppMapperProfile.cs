using AutoMapper;
using WebValik.Data.Entities;
using WebValik.Models.Category;
using WebValik.Models.Product;

namespace WebValik.Mapper
{
    public class AppMapperProfile : Profile
    {
        public AppMapperProfile()
        {
            CreateMap<CategoryEntity, CategoryItemViewModel>();
            CreateMap<CategoryCreateViewModel, CategoryEntity>();

            CreateMap<ProductEntity, ProductItemViewModel>()
                .ForMember(x => x.Images, opt => opt.MapFrom(p => p.ProductImages.Select(x => x.Image).ToList()))
                .ForMember(x => x.CategoryName, opt => opt.MapFrom(c => c.Category.Name));
        }
    }
}
