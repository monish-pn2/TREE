// Function to filter platforms with registered status as true
function getRegisteredPlatforms(data) {
    const registeredPlatforms = [];
    for (const platform in data.account_details) {
        if (data.account_details.hasOwnProperty(platform)) {
            if (data.account_details[platform].registered === true) {
                registeredPlatforms.push(platform);
            }
        }
    }
    
    return registeredPlatforms;
}

module.exports = { getRegisteredPlatforms };
