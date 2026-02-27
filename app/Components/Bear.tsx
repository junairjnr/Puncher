// "use client";

// import Script from "next/script";

// export default function TenorGif() {
//   return (
//     <>
//       <div
//         className="tenor-gif-embed"
//         data-postid="5941526"
//         data-share-method="host"
//         data-aspect-ratio="1"
//         data-width="100%"
//       >
//         <a href="https://tenor.com/view/bear-dancing-funny-furry-gif-5941526">
//           Bear Dancing GIF
//         </a>
//       </div>

//       <Script
//         src="https://tenor.com/embed.js"
//         strategy="lazyOnload"
//       />
//     </>
//   );
// }
export default function TenorGif() {
  return (
    <iframe
      src="https://tenor.com/embed/5941526"
      width="100%"
      height="400"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
}