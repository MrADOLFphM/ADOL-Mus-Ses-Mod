module.exports = {
  //!if i dont do GLOBAL: {} or whatever then its global easy acces!!
  ERROR: "An unexpected error has ocurred...",
  NO_PERMS: "You need **{perm}** permissions to do this!",
  NONE: "None",
  I_PERMS: "I do not have {perm} permission",
  NO_USER: "You did not provide an user!",
  GUILD_NAME: "Guild name",
  CONFIG: {
    ADD_CMD_ALREADY_EXISTS:
      "This command name is already added in guild custom commands.",
    ADD_CMD_USED_BY_BOT: "This command name is already in use by the bot",
    ADD_CMD_ADDED:
      "Successfully added **{name}** as a custom command to this guild",
    DEL_CMD_NOT_FOUND: "That command was not found",
    DEL_CMD_DELETED: "Successfully deleted the **{cmd}** Command",
    DEL_CMD_NO_COMMANDS: "This guild doesn't have any custom commands",
    ADD_CMD_NONAME:
      "You have to give command name, `addcmd <cmd_name> <cmd_response>`",
    ADD_CMD_NORESPONSE:
      "You have to give command cmd response, `addcmd <cmd_name> <cmd_response>`",
    BLACKLISTED_PROVIDE_OPTION:
      "Please provide an option '`add`, `remove`, `get`'",
    BLACKLISTED_ALREADY_EXISTS: "**{item}** already exist in blacklisted words",
    BLACKLISTED_ADDED: "Successfully added **{item}** to blacklisted words",
    BLACKLISTED_NOT_EXISTS: "**{item}** does not exist in blacklisted words",
    BLACKLISTED_REMOVED:
      "Successfully removed **{item}** from blacklisted words",
    BLACKLISTED_NONE_YET: "There are no blacklisted words yet.",
    BLACKLISTED_NO_WORDS: "This guid does not have any blacklisted words yet",
  },
  MODLOG: {
    TYPE: "Type",
    REASON: "Reason",
    USER: "User",
    MODERATOR: "Moderator",
  },
  MODERATION: {
    WARN: "Warn",
    MUTE: "Mute",
    NO_WARN_USER:
      "Please Mention the person to who you want to warn - warn @mention <reason>",
    WARN_BOT: "You cannot warn bots!",
    CANNOT_WARN_YOURSELF: "You cannot warn yourself!",
    WARN_OWNER: "You cannot warn the owner of the server!",
    WARN_LIMIT: "This user reacher her/his limit!",
    WARN_DM: "You have been warned in {guild} for **{reason}**",
    WARNED_SUCCES: "You warned **{user}** for {reason}",
    NO_WARNINGS: "This user doesnt have warnings!",
    WARNING: "Warning",
    ID: "ID",
    USER_NOT_MUTED: "That user is not muted!",
    MUTE_SUCCES: "{user} succesfully unmuted!",
    UNLOCK_SUCCES: "{channel} was succesfully unlocked",
    NO_ID: "You did not provide an id!",
  },
  MAIN: {
    ALREADY_AFK: "You are already afk!",

    NOW_AFK: 'You are now afk!\nReason: {reason || "AFK"}',
    COVID_STATS: "Coronavirus Stats",
    CONFIRMED_COVID_CASES: "Confirmed Cases",
    TODAY_COVID_CASES: "Today Cases",
    TODAY_COVID_DEATHS: "Today Deaths",
    ACTIVE_COVID: "Active",
    RECOVERED_COVID: "Recovered",
    DEATHS_COVID: "Deaths",
    TESTS_COVID: "Tests",
    CASES_PER_MIL_COVID: "Cases Per Mil",
    DEATHS_PER_MIL_COVID: "Deaths Per Mil",
    LAST_UPDATED_COVID: "Last Updated: {updatedTime}",
    COUNTRY_NOT_FOUND_COVID:
      "I couldn't find that country. That country either doesn't exist, was typed incorrectly or has no confirmed cases. For a list of supported country names please type `c.countries`",
    SUGGEST_CHANNEL_NOT_SET: "The suggestion channel hasnt been set yet!",
    GIVE_SUGGESTION: "Please Give the Suggestion",
    NO_MOVIE_PROVIDED: "Please give the name of movie or series",
  },
  IMDB: {
    RATINGS: "Ratings",
    COUNTRY: "Country",
    GENRES: "Genres",
    AWARDS: "Awards",
    LANGUAGES: "Languages",
    RELEASED: "Released",
    TYPE: "Type",
  },
  BACKUP: {
    CREATING: "Creating a backup.....",
    ID: "Backup ID",
    CREATED: "Backup created!",
  },
};
