$(document).ready(function () {
    $('.lookup-form').submit(function(event){
        event.preventDefault();
        let name = $('.lookup-form .username').val();
        channelLookup(name);
        $('#lookup-user-section').fadeIn('fast');
    })
});

// Headers for ajax calls.
function setHeader(xhr) {
    xhr.setRequestHeader('Client-ID', '8682f64ae59cbcba5cd701c205b54b04a424b46ca064e563');
}

// Lookup channel and parse data into variables
function channelLookup(username){
    // Reset Fields
    $('.info p').not('.uAvatarURL, .cThumbURL, .label, .uSocial').empty();
    $('.cOnline').removeClass('offline, online');
    $('.twitter').hide().attr("href",'');
    $('.youtube').hide().attr("href",'');
    $('.playerme').hide().attr("href",'');
    $('.lookup-info').removeClass('hidden');
    
    $.ajax({
        url: "https://Mixer.com/api/v1/channels/" + username,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        success: function(data){
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
            let cTranscode = data.hasTranscodes;
            let cSuspended = data.suspended;
            let cName = data.name;
            let cAudience = data.audience;
            let cViewersTotal = data.viewersTotal;
            let cViewersCurrent = data.viewersCurrent;
            let cNumFollowers = data.numFollowers;
            let cInteractive = data.interactive;
            let cFTL = data.ftl;
            let cDescriptionCreation = data.createdAt;
            let cDescriptionUpdated = data.updatedAt;
            let cThumbURL = "https://crowbartools.com/projects/mixer-lookup/images/no-image.jpg";
            let cThumbCreation = "No Created Data";
            let cThumbUpdated = "No Updated Data";
            let cGameName = "No Game Name";
            let cGameDescription = "No Game Description";
            let cGameDescriptionSource = "No Game Source";
            
            if(data.thumbnail != null){
                cThumbURL = data.thumbnail.url ? data.thumbnail.url : "https://crowbartools.com/projects/mixer-lookup/images/no-image.jpg";
                cThumbCreation = data.thumbnail.createdAt ? data.thumbnail.createdAt : "No Created Data";
                cThumbUpdated = data.thumbnail.updatedAt ? data.thumbnail.updatedAt : "No Updated Data";
            }

            if(data.type != null){
                cGameName = data.type.name ? data.type.name : "No Game Name";
                cGameDescription = data.type.description ? data.type.description : "No Game Description";
                cGameDescriptionSource = data.type.source ? data.type.source : "No Game Source";
            }


            let cShareText = data.preferences.sharetext;
            let cFollowMessage = data.preferences['channel:notify:followmessage'];
            let cSubscriberMessage = data.preferences['channel:notify:subscribemessage'];
            let cSubscriberMail = data.preferences['channel:partner:submail'];
            let cTweetText = data.preferences['channel:tweet:body'];
            
            // Convert to Human
            if(cOnline === false){
                cOnline = 'offline';
                $('.cOnline').addClass('offline');
            } else {
                cOnline = 'online';
                $('.cOnline').addClass('online');
            }

            if(cSuspended === false){
                cSuspended = 'no';
            }else{
                cSuspended = 'yes';
            }

            if(cInteractive === false){
                cInteractive = 'Not interactive.';
            }else{
                cInteractive = 'Interactive is on.';
            }

            if(cFeatured === false){
                cFeatured = 'no';
            }else{
                cFeatured = 'yes';
            }

            if(cPartnered === false){
                cPartnered = 'no';
            } else {
                cPartnered = 'yes';
            }

            if(cTranscode === true){
                cTranscode = "Transcoding is on."
            } else{
                cTranscode = "Transcoding is off."
            }        

            // Let's get their anniversary date.
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
                if(k !== "verified"){
                    let template = `
                        <a href="${v}" class="${k}" target="_blank">
                            ${k}
                        </a>
                    `;

                    $('.uSocial').append(template);
                }
            })

            $('.uExperience').text(uExperience);
            $('.uSparks').text(uSparks);
            $('.uAvatarURL img').attr('src',uAvatarURL);
            $('.uBio').text(uBio);
            $('.uCreation').text(moment(uCreation).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            $('.uUpdated').text(moment(uUpdated).format("dddd, MMMM Do YYYY, h:mm:ss a"));

            let newHTML = [];
            for (let i = 0; i < uGroups.length; i++) {
                newHTML.push('<div class="group">'+uGroups[i].name+'</div>');
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
            $('.cFTL').text(cFTL);
            $('.cDescriptionCreation').text(moment(cDescriptionCreation).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            $('.cDescriptionUpdated').text(moment(cDescriptionUpdated).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            $('.cThumbURL img').attr('src', cThumbURL);
            $('.cThumbCreation').text(moment(cThumbCreation).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            $('.cThumbUpdated').text(moment(cThumbUpdated).format("dddd, MMMM Do YYYY, h:mm:ss a"));
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

            $('.cLink').html('<a href="http://www.Mixer.com/'+cToken+'" target="blank">Go To Channel ></a>'); 
        }
    })
}

//Find Hosters
function hosters(cID){
    $('.cHosted').append('<span>None</span>');

    $.ajax({
        url: "https://Mixer.com/api/v1/channels/" + cID + "/hosters",
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        success: function(data){
            if(data.length){
                let i;
                for (i = 0; i < data.length; ++i) {
                    let streamer = data[i].token;
                    let viewers = data[i].viewersCurrent;
                    $('.cHosted').append('<span>'+streamer+' ('+viewers+')</span>');
                }
            }
        }
    })
}