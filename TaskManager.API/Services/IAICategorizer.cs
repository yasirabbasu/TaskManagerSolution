namespace TaskManager.API.Services
{
    public interface IAICategorizer
    {
        string CategorizeTask(string description);
    }
}
