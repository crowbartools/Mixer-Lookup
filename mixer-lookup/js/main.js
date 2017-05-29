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
        var uUserID = data.user.id;
        var uUsername = data.user.username;
        var uVerified = data.user.verified;
        var uSocial = data.user.social;
        var uExperience = data.user.experience;
        var uSparks = data.user.sparks;
        var uAvatarURL = data.user.avatarUrl;
		var uLevel = data.user.level;
        var uBio = data.user.bio;
        var uCreation = data.user.createdAt;
        var uUpdated = data.user.updatedAt;
        var uGroups = data.user.groups;

        // Channel Info
        var cID = data.id;
        var cToken = data.token;
        var cOnline = data.online;
        var cFeatured = data.featured;
        var cPartnered = data.partnered;
        var cTranscode = data.transcodingEnabled;
        var cSuspended = data.suspended;
        var cName = data.name;
        var cAudience = data.audience;
        var cViewersTotal = data.viewersTotal;
        var cViewersCurrent = data.viewersCurrent;
        var cNumFollowers = data.numFollowers;
        var cInteractive = data.interactive;
        var cTetrisGameId = data.tetrisGameId;
        var cFTL = data.ftl;
        var cDescriptionCreation = data.createdAt;
        var cDescriptionUpdated = data.updatedAt;
		
		if(data.thumbnail !== null){
			var cThumbURL = data.thumbnail.url;
			var cThumbCreation = data.thumbnail.createdAt;
			var cThumbUpdated = data.thumbnail.updatedAt;
		}
		
		if(data.type !== null){
			var cGameName = data.type.name;
			var cGameDescription = data.type.description;
			var cGameDescriptionSource = data.type.source;
		}

        var cShareText = data.preferences.sharetext;
        var cFollowMessage = data.preferences['channel:notify:followmessage'];
        var cSubscriberMessage = data.preferences['channel:notify:subscribemessage'];
        var cSubscriberMail = data.preferences['channel:partner:submail'];
        var cTweetText = data.preferences['channel:tweet:body'];
		
        // Convert to Human
        if(cOnline === false){
            var cOnline = 'offline';
            $('.cOnline').addClass('offline');
        }else{
            var cOnline = 'online';
            $('.cOnline').addClass('online');
        }

        if(cSuspended === false){
            var cSuspended = 'no';
        }else{
            var cSuspended = 'yes';
        }

        if(cInteractive === false){
            var cInteractive = 'Not interactive.';
        }else{
            var cInteractive = 'Interactive is on.';
        }

        if(cFeatured === false){
            var cFeatured = 'no';
        }else{
            var cFeatured = 'yes';
        }

        if(cPartnered === false){
            var cPartnered = 'no';
        }else{
            var cPartnered = 'yes';
        }

        if(cGameDescription == ""){
            var cGameDescription = "Description not available."
        }

        if(cFTL === -1){
            var cFTL = "FTL not active."
        } else{
            var cFTL = "FTL is active."
        }

        if(cTranscode === true){
            var cTranscode = "Transcoding is on."
        } else{
            var cTranscode = "Transcoding is off."
        }
		
		if (cGameName === undefined || cGameName === null){
			var cGameName = "No Game Set."
		}


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

        var newHTML = [];
        for (var i = 0; i < uGroups.length; i++) {
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

		var trimmedUsername = username.trim();
		// throw in profile links
		$('.links .direct .link').html('<a href="http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'">http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'</a>');
		$('.links .clean .link').html('<a href="http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'&clean=yes">http://www.firebottle.tv/projects/Mixer-lookup?username='+trimmedUsername+'&clean=yes</a>');
		$('.links').show();

}

//Find Hosters
function hosters(cID){
	$.getJSON("https://Mixer.com/api/v1/channels/" + cID + "/hosters", function(data) {
		if(data.length){
			var i;
			for (i = 0; i < data.length; ++i) {
			    var streamer = data[i].token;
			    var viewers = data[i].viewersCurrent;
			    $('.cHosted').append('<span>'+streamer+' ('+viewers+')</span>');
			}
		} else {
			$('.cHosted').append('<span>None</span>');
		}		
	});
}

// Function to grab URL parameters
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
// Grab the parameters we need.
var username = getUrlParameter('username');
var cleanUI = getUrlParameter('clean');

// Check parameters and render something that won't break the page.
if (username != '' && username != null && username != undefined && cleanUI != 'yes'){
    channelLookup(username);
} else if ( username != '' && username != null && username != undefined && cleanUI == 'yes'){
    channelLookup(username);
    $('.top, .links').hide();
} else if ( username != '' || username === null || username === undefined && cleanUI == 'yes'){
    console.log('Defaulting to regular page layout.')
}

// Set initial show hide button text
function uiHider(){
    var visible = $('.top').is(':visible');
    if( visible == true){
        $('.uihide').text('Hide UI');
    } else {
        $('.uihide').text('Show UI');
    }
}

// Things to run on page load.
$( document ).ready(function() {
    uiHider();

    // Add Username
    $('.streamerinputaddbtn').click(function() {
        var username = $('.streamerinputadd').val();
        channelLookup(username);
    });

    // UI Hider
    $('.uihide').click(function() {
        $('.top').slideToggle();
        var btnText = $('.uihide').text();
        if (btnText == 'Hide UI'){
            $('.uihide').text('Show UI');
        }else{
            $('.uihide').text('Hide UI');
        }
    });
});



