namespace user_crud_API.Models.Requests
{
    public class ChangePassRequest
    {
        public int? Id { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
