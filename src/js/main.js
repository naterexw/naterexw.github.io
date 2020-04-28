$(document).ready(function () {
  $(".menu .item").tab();
  $(".buttons .button").tab();
  $(".ui.dropdown").dropdown();
  $(".map.embed").embed();
  $(".ui.accordion").accordion();


  // Navbar
  $("#navOpenSearch").on("click", function () {
    $(".search-input.mobile").show();
  });
  $("#btnCloseSearch").on("click", function () {
    $(".search-input.mobile").toggle();
  });

  // Sidebar toggle
  $(".nav.item").click(function () {
    $(".pusher").toggleClass("mobile");
    $("#sidebar").toggleClass("yt-toggle");
    $("#sidebarMobile").toggleClass("yt-toggle-mobile");
    $(".yt-overlay").toggleClass("show");
  });
  $(".yt-overlay").on("click", function () {
    $(".yt-overlay").toggleClass("show");
    $("#sidebar").toggleClass("yt-toggle");
  });
  // Sidebar active link
  $(".yt-sidebar .item").on("click", function (e) {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // Select Theme
  $("#selectTheme").change(function () {
    $("html").removeAttr("dark");
    if ($(this).val() === "default") {
      return $("#cssTheme").attr("href", "css/semantic.min.css");
    }

    let pathTheme = "css/semantic." + $(this).val() + ".min.css";
    $("#cssTheme").attr("href", pathTheme);

    if ($(this).val() === "dark") {
      $("html").attr("dark", "true");
    }
  });

  // Fomantic message
  $('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  });

  // Search input typing text
  let typed = new Typed(".search-input input", {
    strings: [
      "Search or paste video link of Youtube",
      "Search or paste video link of Facebook",
      "Search or paste video link of Instagram",
      "Search or paste video link of Twitch",
      "Search or paste video link of Vimeo",
      "Search or paste video link of Dailymotion",
      "Search or paste video link of Pornhub",
      "Search or paste video link of any video site...",
      "Search or paste video link of any video site...",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 900,
    startDelay: 200,
    loop: true,
    showCursor: true,
    autoInsertCss: true,
    attr: "value",
    bindInputFocusEvents: true,
  });

  // embeded-youtubejs Validate Youtube Thumbnail Form
  $(".form-yt-thumbnail").form({
    on: "blur",
    fields: {
      playback: {
        identifier: "playback",
        rules: [
          {
            type: "checked",
            prompt: "Please select playback option",
          },
        ],
      },
      videoUrl: {
        identifier: "videoUrl",
        rules: [
          {
            type: "url",
            prompt: "Please type a video url",
          },
        ],
      },
    },
    onSuccess: function (event, fields) {
      thumbnailEmbeded();
      event.preventdefault();
    },
  });

  // Validate Youtube Thumbnail Semantic-ui Form
  $(".form-yt-thumbnail-fomantic").form({
    on: "blur",
    fields: {
      playback: {
        identifier: "playback",
        rules: [
          {
            type: "checked",
            prompt: "Please select playback option",
          },
        ],
      },
      videoUrl: {
        identifier: "videoUrl",
        rules: [
          {
            type: "url",
            prompt: "Please type a video url",
          },
        ],
      },
    },
    onSuccess: function (event, fields) {
      thumbnailSemantic();
      event.preventdefault();
    },
  });

  // Add Grapgh Facebook Metadeta to Youtube Thumbnail
  function thumbnailEmbeded() {
    let videoUrl = $("#videoUrl").val().split("v=")[1];
    let ampersandPosition = videoUrl.indexOf("&");
    if (ampersandPosition != -1) {
      videoUrl = videoUrl.substring(0, ampersandPosition);
    }

    let imgUrl = $("#imgUrl").val();
    let title = $("#changeTitle").val();
    let discription = $("#changeDescription").val();

    // Facebook graph
    $("#ogUrl").attr(
      "content",
      "https://ahmedeid3.github.io/thumbnail/dist/thumbnail-fomantic.html/id"
    );
    $("#ogTitle").attr("content", title);
    $("#ogDescription").attr("content", discription);
    $("#ogImage").attr("content", imgUrl);

    $("#beforeThumbnail").embed({
      source: "youtube",
      id: videoUrl,
    });
    $("#afterThumbnail").attr({ id: videoUrl, src: imgUrl });

    thumbnail();
  }

  // Add Grapgh Facebook Metadeta to Youtube Thumbnail Semantic-ui
  function thumbnailSemantic() {
    let videoUrl = $("#videoUrl").val().split("v=")[1];
    let ampersandPosition = videoUrl.indexOf("&");
    if (ampersandPosition != -1) {
      videoUrl = videoUrl.substring(0, ampersandPosition);
    }

    let imgUrl = $("#imgUrl").val();
    let title = $("#changeTitle").val();
    let discription = $("#changeDescription").val();

    // Facebook graph
    $("#ogUrl").attr(
      "content",
      "https://ahmedeid3.github.io/thumbnail/dist/thumbnail-fomantic.html/id"
    );
    $("#ogTitle").attr("content", title);
    $("#ogDescription").attr("content", discription);
    $("#ogImage").attr("content", imgUrl);

    // show embeded
    $("#beforeThumbnail").embed({
      source: "youtube",
      id: videoUrl,
    });

    $("#afterThumbnail").embed({
      source: "youtube",
      id: videoUrl,
      icon: "video play",
      placeholder: imgUrl,
    });
    $(".youtube-icon").show();
  }
  // thumbnail fomantic / play video by large icon
  $(".youtube-icon").on("click", function () {
    let src = $("#afterThumbnail iframe").attr("src");
    let autoplaySrc = src.replace("&autoplay=auto", "&autoplay=1");
    $("#afterThumbnail iframe").attr("src", autoplaySrc);
    $(this).hide();
  });

  // FBlink Generator Functionality
  $("#addTitle").on("keyup", function () {
    $("#fbCardTitle").text($(this).val());
  });
  $("#addDescription").on("keyup", function () {
    $("#fbCardDescription").text($(this).val());
  });
  $("#thumbnailUrl").on("change", function () {
    $("#fbCardThumbnail").attr("src", $(this).val());
  });

  // Validate FBlink Generator Form
  $(".fb-link-form").form({
    on: "blur",
    fields: {
      yourLink: {
        identifier: "yourLink",
        rules: [
          {
            type: "url",
            prompt: "Please type a your link",
          },
        ],
      },
      title: {
        identifier: "title",
        rules: [
          {
            type: "empty",
            prompt: "Please type a title",
          },
        ],
      },
      description: {
        identifier: "description",
        rules: [
          {
            type: "empty",
            prompt: "Please type a description",
          },
        ],
      },
      thumbnailUrl: {
        identifier: "thumbnailUrl",
        rules: [
          {
            type: "url",
            prompt: "Please type a thumbnail Url",
          },
        ],
      },
    },
    onSuccess: function (event, fields) {
      fblinkMetadeta();
    },
  });

  // FBling Generator Add grapgh facebook metadeta
  function fblinkMetadeta() {
    let yourLink = $("#yourLink").val();
    let title = $("#addTitle").val();
    let discription = $("#addDescription").val();
    let thumbnailUrl = $("#thumbnailUrl").val();

    // Facebook graph
    $("#ogUrl").attr(
      "content",
      "https://ahmedeid3.github.io/thumbnail/dist/thumbnail-fblink.html/id"
    );
    $("#ogTitle").attr("content", title);
    $("#ogDescription").attr("content", discription);
    $("#ogImage").attr("content", thumbnailUrl);
  }

  // Validate login form
  $(".login-form").form({
    fields: {
      email: {
        identifier: "email",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your e-mail",
          },
          {
            type: "email",
            prompt: "Please enter a valid e-mail",
          },
        ],
      },
      password: {
        identifier: "password",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your password",
          },
          {
            type: "length[6]",
            prompt: "Your password must be at least 6 characters",
          },
        ],
      },
    },
  });

  // Validate signup form
  $(".signup-form").form({
    fields: {
      email: {
        identifier: "email",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your e-mail",
          },
          {
            type: "email",
            prompt: "Please enter a valid e-mail",
          },
        ],
      },
      password: {
        identifier: "password",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your password",
          },
          {
            type: "length[6]",
            prompt: "Your password must be at least 6 characters",
          },
        ],
      },
      match: {
        identifier: "repassword",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your password",
          },
          {
            type: "length[6]",
            prompt: "Your password must be at least 6 characters",
          },
          {
            type: "match[password]",
            prompt: "Please put the same value in both password fields",
          },
        ],
      },
    },
  });
});
