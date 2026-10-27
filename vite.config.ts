// import { defineConfig } from "vite";
// import react, { reactCompilerPreset } from "@vitejs/plugin-react";
// import babel from "@rolldown/plugin-babel";
// import { readdirSync } from "node:fs";
// import path from "node:path";
// import type { Plugin } from "vite";

// const companyDirectory = path.resolve(process.cwd(), "public/Company");
// const virtualModuleId = "virtual:company-questions";
// const resolvedVirtualModuleId = `\0${virtualModuleId}`;

// function companyQuestionsPlugin(): Plugin {
//   return {
//     name: "company-questions",
//     resolveId(id) {
//       if (id === virtualModuleId) return resolvedVirtualModuleId;
//     },
//     load(id) {
//       if (id !== resolvedVirtualModuleId) return;

//       const documents = readdirSync(companyDirectory, { withFileTypes: true })
//         .filter(
//           (entry) =>
//             entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"),
//         )
//         .map((entry) => ({
//           fileName: entry.name,
//           title: entry.name
//             .replace(/\.pdf$/i, "")
//             .replace(/[_-]+/g, " ")
//             .replace(/\s+/g, " ")
//             .trim()
//             .replace(/\b\w/g, (letter) => letter.toUpperCase()),
//         }))
//         .sort((first, second) => first.title.localeCompare(second.title));

//       return `export default ${JSON.stringify(documents)}`;
//     },
//     configureServer(server) {
//       server.watcher.add(companyDirectory);
//       server.watcher.on("all", (event, filePath) => {
//         const isCompanyPdf = path
//           .resolve(filePath)
//           .startsWith(`${companyDirectory}${path.sep}`);

//         if (
//           isCompanyPdf &&
//           /\.pdf$/i.test(filePath) &&
//           (event === "add" || event === "unlink")
//         ) {
//           server.ws.send({ type: "full-reload" });
//         }
//       });
//     },
//   };
// }

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] }),
//     companyQuestionsPlugin(),
//   ],
//   build: {
//     rolldownOptions: {
//       output: {
//         codeSplitting: {
//           groups: [
//             {
//               name: "react-vendor",
//               test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
//               minSize: 20000,
//               maxSize: 400000,
//               priority: 20,
//             },
//             {
//               name: "ui-vendor",
//               test: /node_modules[\\/](@mui|@emotion)[\\/]/,
//               minSize: 20000,
//               maxSize: 400000,
//               priority: 15,
//             },
//             {
//               name: "pdf-vendor",
//               test: /node_modules[\\/](react-pdf|pdfjs-dist)[\\/]/,
//               minSize: 20000,
//               maxSize: 400000,
//               priority: 14,
//             },
//             {
//               name: "firebase-vendor",
//               test: /node_modules[\\/](@firebase|firebase)[\\/]/,
//               minSize: 20000,
//               maxSize: 400000,
//               priority: 13,
//             },
//             {
//               name: "vendor",
//               test: /node_modules[\\/]/,
//               minSize: 20000,
//               maxSize: 400000,
//               priority: 1,
//             },
//           ],
//         },
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { readdirSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const companyDirectory = path.resolve(process.cwd(), "public/Company");
const virtualModuleId = "virtual:company-questions";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

function companyQuestionsPlugin(): Plugin {
  return {
    name: "company-questions",
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) return;

      const documents = readdirSync(companyDirectory, { withFileTypes: true })
        .filter(
          (entry) =>
            entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"),
        )
        .map((entry) => ({
          fileName: entry.name,
          title: entry.name
            .replace(/\.pdf$/i, "")
            .replace(/[_-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/\b\w/g, (letter) => letter.toUpperCase()),
        }))
        .sort((first, second) => first.title.localeCompare(second.title));

      return `export default ${JSON.stringify(documents)}`;
    },
    configureServer(server) {
      server.watcher.add(companyDirectory);
      server.watcher.on("all", (event, filePath) => {
        const isCompanyPdf = path
          .resolve(filePath)
          .startsWith(`${companyDirectory}${path.sep}`);

        if (
          isCompanyPdf &&
          /\.pdf$/i.test(filePath) &&
          (event === "add" || event === "unlink")
        ) {
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    companyQuestionsPlugin(),
  ],
  build: {
    // Large lazy-loaded pages (and pdf.js) exceed the default 500 kB warning
    chunkSizeWarningLimit: 1500,
  },
});
