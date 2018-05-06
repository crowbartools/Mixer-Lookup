$(document).ready(function () {
    $('.lookup-form').submit(function(event){
        event.preventDefault();
        let name = $('.lookup-form .username').val();
        channelLookup(name);
        $('#lookup-user-section').fadeIn('fast');
    })
});

// Lookup channel and parse data into variables
function channelLookup(username){
    // Reset Fields
    $('.info p').not('.uAvatarURL, .cThumbURL, .label, .uSocial').empty();
    $('.cOnline').removeClass('offline, online');
    $('.twitter').hide().attr("href",'');
    $('.youtube').hide().attr("href",'');
    $('.playerme').hide().attr("href",'');
    $('.lookup-info').removeClass('hidden');

    $.getJSON("https://Mixer.com/api/v1/channels/" + username, function(data) {

        // User Info
        let uUserID = data.user.id;
        let uUsername = data.user.username;
        let uVerified = data.user.verified;
        let uSocial = data.user.social;
        let uExperience = data.user.experience;
        let uSparks = data.user.sparks;
        let uAvatarURL = data.user.avatarUrl;
        let uLevel = data.user.level;
        let uBio = data.user.bio;
        let uCreation = data.user.createdAt;
        let uUpdated = data.user.updatedAt;
        let uGroups = data.user.groups;

        // Channel Info
        let cID = data.id;
        let cToken = data.token;
        let cOnline = data.online;
        let cFeatured = data.featured;
        let cPartnered = data.partnered;
        let cTranscode = data.transcodingEnabled;
        let cSuspended = data.suspended;
        let cName = data.name;
        let cAudience = data.audience;
        let cViewersTotal = data.viewersTotal;
        let cViewersCurrent = data.viewersCurrent;
        let cNumFollowers = data.numFollowers;
        let cInteractive = data.interactive;
        let cTetrisGameId = data.tetrisGameId;
        let cFTL = data.ftl;
        let cDescriptionCreation = data.createdAt;
        let cDescriptionUpdated = data.updatedAt;
        
        if(data.thumbnail !== null){
            let cThumbURL = data.thumbnail.url;
            let cThumbCreation = data.thumbnail.createdAt;
            let cThumbUpdated = data.thumbnail.updatedAt;
        }
        
        if(data.type !== null){
            let cGameName = data.type.name;
            let cGameDescription = data.type.description;
            let cGameDescriptionSource = data.type.source;
        }

        let cShareText = data.preferences.sharetext;
        let cFollowMessage = data.preferences['channel:notify:followmessage'];
        let cSubscriberMessage = data.preferences['channel:notify:subscribemessage'];
        let cSubscriberMail = data.preferences['channel:partner:submail'];
        let cTweetText = data.preferences['channel:tweet:body'];
        
        // Convert to Human
        if(cOnline === false){
            let cOnline = 'offline';
            $('.cOnline').addClass('offline');
        }else{
            let cOnline = 'online';
            $('.cOnline').addClass('online');
        }

        if(cSuspended === false){
            let cSuspended = 'no';
        }else{
            let cSuspended = 'yes';
        }

        if(cInteractive === false){
            let cInteractive = 'Not interactive.';
        }else{
            let cInteractive = 'Interactive is on.';
        }

        if(cFeatured === false){
            let cFeatured = 'no';
        }else{
            let cFeatured = 'yes';
        }

        if(cPartnered === false){
            let cPartnered = 'no';
        }else{
            let cPartnered = 'yes';
        }

        if(cGameDescription == ""){
            let cGameDescription = "Description not available."
        }

        if(cFTL === -1){
            let cFTL = "FTL not active."
        } else {
            let cFTL = "FTL is active."
        }

        if(cTranscode === true){
            let cTranscode = "Transcoding is on."
        } else{
            let cTranscode = "Transcoding is off."
        }
        
        if (cGameName === undefined || cGameName === null){
            let cGameName = "No Game Set."
        }
        

        // Let's get their anniversary date.
        let uCreation = data.user.createdAt
        let uCreationHuman = moment(uCreation).format("dddd, MMMM Do YYYY, h:mm:ss a");
        let currentTime = moment();
        let currentYear = moment().year();
        let nextBDay = moment(uCreation).set('year', currentYear);
        let nextBDayHuman = moment(uCreation).set('year', currentYear).format("dddd, MMMM Do YYYY, h:mm:ss a");
        let d = new Date();
        let n = d.toISOString();
        
        // If their birthday has already passed for this year, add a year.
        if(moment().format("MMM Do YY") == moment(nextBDay).format("MMM Do YY") ){
            // Its your Mixiversary!
            let nextBDayHuman = "It's Mixiversary time today!";
        } else if (moment(nextBDay).isBefore(currentTime)){
            // Your Mixiversary passed for this year.
            let nextBDay = moment(uCreation).set('year', currentYear + 1);
            let nextBDayHuman = moment(uCreation).set('year', currentYear + 1).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        // Output anniversary and creation date in readble format.
        $('.user-creation-day').text(uCreationHuman);
        $('.user-anniversary-day').text(nextBDayHuman);


        // Throw vars into fields for styling.
        $('.uUsername').text(uUsername+" - #"+uUserID);
        $('.uVerified').text(uVerified);

        $.each(uSocial, function(k,v){
            if(k == "twitter"){
                $('.twitter').show().attr("href",v);
            }else if(k == "youtube"){
                $('.youtube').show().attr("href",v);
            }else if(k == "player"){
                $('.playerme').show().attr("href",v);
            }
        })

        $('.uExperience').text(uExperience);
        $('.uSparks').text(uSparks);
        $('.uAvatarURL img').attr('src',uAvatarURL);
        $('.uBio').text(uBio);
        $('.uCreation').text(uCreation);
        $('.uUpdated').text(uUpdated);

        let newHTML = [];
        for (let i = 0; i < uGroups.length; i++) {
            newHTML.push('<span class="group">'+uGroups[i].name+'</span>');
        }
        $('.uGroups').html(newHTML.join(""));

        $('.cToken').text(cToken+' - #'+cID);
        $('.cOnline').text(cOnline);
        $('.cFeatured').text(cFeatured);
        $('.cPartnered').text(cPartnered);
        $('.cTranscode').text(cTranscode);
        $('.cSuspended').text(cSuspended);
        $('.cName').text(cName);
        $('.cAudience').text(cAudience);
        $('.cViewersTotal').text(cViewersTotal);
        $('.cViewersCurrent').text(cViewersCurrent);
        $('.cNumFollowers').text(cNumFollowers);
        $('.uLevel').text(uLevel);
        $('.cInteractive').text(cInteractive);
        $('.cTetrisGameId').text(cTetrisGameId);
        $('.cFTL').text(cFTL);
        $('.cDescriptionCreation').text(cDescriptionCreation);
        $('.cDescriptionUpdated').text(cDescriptionUpdated);
        $('.cThumbURL img').attr('src',cThumbURL);
        $('.cThumbCreation').text(cThumbCreation);
        $('.cThumbUpdated').text(cThumbUpdated);
        $('.cGameName').text(cGameName);
        $('.cGameDescription').text(cGameDescription);
        $('.cGameDescriptionSource').text(cGameDescriptionSource);
        $('.cShareText').text(cShareText);
        $('.cTweetText').text(cTweetText);
        $('.cFollowMessage').text(cFollowMessage);
        $('.cSubscriberMessage').text(cSubscriberMessage);
        $('.cSubscriberMail').text(cSubscriberMail);

        // Pull list of hosters
        hosters(cID);

        $('.cLink').html('<a href="http://www.Mixer.com/'+cToken+'" target="blank">Go To Channel ></a>');    })

        let trimmedUsername = username.trim();
        // throw in profile links
        $('.links .direct .link').html('<a href="http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'">http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'</a>');
        $('.links .clean .link').html('<a href="http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'&clean=yes">http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'&clean=yes</a>');
        $('.links').show();    
}

//Find Hosters
function hosters(cID){
    $.getJSON("https://Mixer.com/api/v1/channels/" + cID + "/hosters", function(data) {
        if(data.length){
            let i;
            for (i = 0; i < data.length; ++i) {
                let streamer = data[i].token;
                let viewers = data[i].viewersCurrent;
                $('.cHosted').append('<span>'+streamer+' ('+viewers+')</span>');
            }
        } else {
            $('.cHosted').append('<span>None</span>');
        }		
    });
}