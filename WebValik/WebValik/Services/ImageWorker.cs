using WebValik.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace WebValik.Services;

public class ImageWorker : IImageWorker
{
    private readonly IWebHostEnvironment _environment; // ми звідти берем фото
    private const string dirName = "uploading"; // назва папки
    private int[] sizes = { 50, 150, 300, 600, 1200 }; // розміри фото
    public string[] sizes_str { get; set; } = new string[5];
    public ImageWorker(IWebHostEnvironment environment)
    {
        _environment = environment;
    }
    public string Save(string url)
    {
        try
        {
            using (HttpClient client = new HttpClient())
            {
                // Надішліть запит GET на URL зображення
                HttpResponseMessage response = client.GetAsync(url).Result;

                // Перевірте, чи код статусу відповіді вказує на успіх (наприклад, 200 OK)
                if (response.IsSuccessStatusCode)
                {
                    // Прочитайте байти зображення з вмісту відповіді
                    byte[] imageBytes = response.Content.ReadAsByteArrayAsync().Result;
                    return CompresImage(imageBytes);
                }
                else
                {
                    // Помилка при відкритті фото
                    Console.WriteLine($"Failed to retrieve image. Status code: {response.StatusCode}");
                    return String.Empty;
                }
            }
        }
        catch (Exception ex)
        {
            // Помилка при client
            Console.WriteLine($"An error occurred: {ex.Message}");
            return String.Empty;
        }
    }

    private string CompresImage(byte[] bytes)
    {
        // Перетворення їх на маленьких
        string imageName = Guid.NewGuid().ToString() + ".webp";

        // Перенесення фото на uploading, якщо нема - створюємо папку
        var dirSave = Path.Combine(_environment.WebRootPath, dirName);
        if (!Directory.Exists(dirSave))
        {
            Directory.CreateDirectory(dirSave);
        }

        // Створюємо ті самі фото розного розміру
        foreach (int size in sizes)
        {
            var path = Path.Combine(dirSave, $"{size}_{imageName}"); // шукати назву
            for(int i = 0; i < sizes_str.Length; i++) { sizes_str[i] = $"{size}_{imageName}"; }
            using (var image = Image.Load(bytes))
            {
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Size = new Size(size, size),
                    Mode = ResizeMode.Max
                })); // міняє розмір фото
                image.SaveAsWebp(path); // зберігаємо фото такого розміру
            }
        }

        return imageName;
    }

    public void Delete(string fileName)
    {
        foreach (int size in sizes)
        {
            var fileSave = Path.Combine(_environment.WebRootPath, dirName, $"{size}_{fileName}"); // шукати назву
            if (File.Exists(fileSave)) File.Delete(fileSave); // якщо є - видаляти фото всіх розмірів
        }
    }

    public string Save(IFormFile file)
    {
        try
        {
            // вибраний файл у файловому провіднику
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream); // копіювати сам файл
                byte[] imageBytes = memoryStream.ToArray(); // к-сть байтів у самому файлі
                return CompresImage(imageBytes);
            }
        }
        catch (Exception ex)
        {
            // Помилка при memoryStream
            Console.WriteLine($"An error occurred: {ex.Message}");
            return String.Empty;
        }
    }

    public string[] Massive()
    {
        return sizes_str;
    }
}
