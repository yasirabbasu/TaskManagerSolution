namespace TaskManager.API.Services
{
    public class MockAICategorizer : IAICategorizer
    {
        public string CategorizeTask(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                return "Uncategorized";

            var lowerDesc = description.ToLower();

            if (ContainsAny(lowerDesc, ["meeting", "call", "conference"]))
                return "Communication";

            if (ContainsAny(lowerDesc, ["buy", "purchase", "order"]))
                return "Shopping";

            if (ContainsAny(lowerDesc, ["write", "document", "report"]))
                return "Writing";

            return "Other";
        }


        private bool ContainsAny(string input, string[] terms)
        {
            return terms.Any(term => input.Contains(term));
        }
    }
}
