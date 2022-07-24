var imagedata;

document
  .getElementById("file")
  .addEventListener("change", handleFileSelect, false);

function handleFileSelect(evt) {
  var file = evt.target.files[0];

  // add html to page and display the image
  if (file) {
    document.getElementById("secondrow").innerHTML = `<div class="row mt-3">
      <div class="col col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="card">
                  <div class="card-header">
                        Image Preview
                  </div>
                  <div id="previewdiv" class="card-body">
                        <img width="100%"src="${URL.createObjectURL(
                          file
                        )}" alt="" />
                  </div>
            </div>
      </div>
      <div class="col col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="card">
                  <div class="card-header">
                        EXIF
                  </div>
                  <div id="exifdiv" class="card-body">

                  </div>
            </div>
      </div>

</div>`;
  }

  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      imagedata = reader.result;
      // console.log(imagedata);
      var exifObj = piexif.load(imagedata);
      // console.log(exifObj);
      document.getElementById(
        "exifdiv"
      ).innerHTML += `<div class="mb-3"><button type="button" class="btn btn-primary">Remove and Download</button> <button type="button" class="btn btn-primary">Update and Download</button></div> <br>
      `;
      for (var ifd in exifObj) {
        if (ifd == "thumbnail") {
          continue;
        }
        console.log("-" + ifd);
        //
        document.getElementById(
          "exifdiv"
        ).innerHTML += `<span class="badge rounded-pill text-bg-primary">${ifd}</span><br>`;

        //
        for (var tag in exifObj[ifd]) {
          console.log(
            "  " + piexif.TAGS[ifd][tag]["name"] + ":" + exifObj[ifd][tag]
          );
          //
          document.getElementById(
            "exifdiv"
          ).innerHTML += `<label class="form-label">${piexif.TAGS[ifd][tag]["name"]}</label>
          <input class="form-control form-control-sm mb-3" type="text" value="${exifObj[ifd][tag]}" aria-label="input value"> `;

          //
        }
      }
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }

  //   var zeroth = {};
  //   var exif = {};
  //   var gps = {};

  //   zeroth[piexif.ImageIFD.Make] = "Make";
  //   zeroth[piexif.ImageIFD.XResolution] = [777, 1];
  //   zeroth[piexif.ImageIFD.YResolution] = [777, 1];
  //   zeroth[piexif.ImageIFD.Software] = "Piexifjs";

  //   exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
  //   exif[piexif.ExifIFD.LensMake] = "LensMake";
  //   exif[piexif.ExifIFD.Sharpness] = 777;
  //   exif[piexif.ExifIFD.LensSpecification] = [
  //     [1, 1],
  //     [1, 1],
  //     [1, 1],
  //     [1, 1],
  //   ];

  //   gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
  //   gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";

  //   var exifObj = { "0th": zeroth, Exif: exif, GPS: gps };
  //   var exifStr = piexif.dump(exifObj);

  //   var reader = new FileReader();
  //   reader.onload = function (e) {
  //     var inserted = piexif.insert(exifStr, e.target.result);

  //     var image = new Image();
  //     image.src = inserted;
  //     image.width = 200;
  //     var el = $("<div></div>").append(image);
  //     $("#resized").prepend(el);
  //   };
  //   reader.readAsDataURL(file);
}
