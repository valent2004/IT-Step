namespace WebValik.Interfaces
{
    public interface IImageWorker
    {
        string Save(string url); // перетворює ссилку фото на фото і зберігає фото в папку uploading
        void Delete(string fileName); // видаляє фото з папки uploading
        string Save(IFormFile file); // зберігає фото в папку uploading
    }
}
