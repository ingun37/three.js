import * as fs from "fs";
import { resolve, extname, basename } from "path";
function modifyTHREE() {
    const threeModuleDir = resolve("build");
    const threeModulePath = resolve(threeModuleDir, "three.module.js");
    const code = fs.readFileSync(threeModulePath, "utf-8");
    const backupDir = resolve(threeModuleDir, "three.module.original.js");

    if (fs.existsSync(backupDir)) {
        console.log(
            `${backupDir} already exists. THREE's must already been modified. Skipping ...`
        );
        return;
    } else {
        console.log("Modifying THREE.js ...");
    }

    const chunk = `\t\tif ( material.transparent === true && material.side === DoubleSide ) {

\t\t\tmaterial.side = BackSide;
\t\t\tmaterial.needsUpdate = true;
\t\t\t_this.renderBufferDirect( camera, scene, geometry, material, object, group );

\t\t\tmaterial.side = FrontSide;
\t\t\tmaterial.needsUpdate = true;
\t\t\t_this.renderBufferDirect( camera, scene, geometry, material, object, group );

\t\t\tmaterial.side = DoubleSide;

\t\t} else {

\t\t\t_this.renderBufferDirect( camera, scene, geometry, material, object, group );

\t\t}`;

    if (!code.includes(chunk))
        throw new Error("Failed to find chunk. Is the version of THREE not 139?");

    const newCode = code.replace(
        chunk,
        `\t\t_this.renderBufferDirect( camera, scene, geometry, material, object, group ); // CLO`
    );
    fs.copyFileSync(threeModulePath, backupDir);
    fs.writeFileSync(threeModulePath, newCode);
}

modifyTHREE();
