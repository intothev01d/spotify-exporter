function displayPlaylistItems(){$("#results").empty();var a=Handlebars.compile($("#playlist-list").html());$("#results").append(a(playlist.items))}function retrieveUserAndPlaylist(){$.ajax({url:apiUrl+"/me",headers:{Authorization:"Bearer "+accessToken}}).then(function(a){return user=a,$.ajax({url:apiUrl+"/users/"+user.id+"/playlists",headers:{Authorization:"Bearer "+accessToken}})}).then(function(a){playlist=a,console.log(a),displayPlaylistItems()}).fail(function(a){console.log(a)})}var authUrl="https://accounts.spotify.com/authorize",apiUrl="https://api.spotify.com/v1",clientId="f880219b69b349bf8683bbcd1091410a",redirectUri="http://localhost:9000",responseType="token",scopes="playlist-read-private",accessToken="",user={},playlist={};jQuery.extend({getQueryParameters:function(a){return(a||document.location.search).replace(/(^\?)/,"").split("&").map(function(a){return a=a.split("="),this[a[0]]=a[1],this}.bind({}))[0]}}),$("#authorize").on("click",function(){var a=authUrl+"?";a+=$.param({client_id:clientId,redirect_uri:redirectUri,response_type:responseType,scope:scopes}),window.location.href=a}),$(document).on("click",".export",function(){var a=$(this).data("id");$.ajax({url:apiUrl+"/users/"+user.id+"/playlists/"+a+"/tracks",headers:{Authorization:"Bearer "+accessToken}}).then(function(a){$("#results").empty();var b=Handlebars.compile($("#playlist-list-items").html());$("#results").append(b(a.items))}).fail(function(a){console.log(a)})}),$(function(){var a=window.location.href;if(-1!==a.search("#access_token")){$("#authorize").hide();var b=a.split("#")[1];b=$.getQueryParameters(b),accessToken=b.access_token,retrieveUserAndPlaylist()}});