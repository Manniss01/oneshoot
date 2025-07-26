import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionsRow = ({ onPromptClick }) => {
    const prompts = [
        "Give me the latest football news",
        "What’s happening in the football world today?",
        "Update me on current football headlines.",
        "Which football matches are trending right now?"
    ];

    return (
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton
                    key={`suggestion-${index}`}
                    text={prompt}
                    onClick={() => onPromptClick(prompt)}
                />
            ))}
        </div>
    );
}

export default PromptSuggestionsRow;
