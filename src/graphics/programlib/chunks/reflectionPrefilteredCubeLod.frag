#extension GL_EXT_shader_texture_lod : enable

uniform samplerCube texture_prefilteredCubeMap128;
uniform float material_reflectionFactor;

void addReflection(inout psInternalData data) {

    float bias = saturate(1.0 - data.glossiness) * 5.0; // multiply by max mip level
    vec3 fixedReflDir = fixSeams(cubeMapProject(data.reflDirW), bias);

    vec3 refl = $DECODE( textureCubeLodEXT(texture_prefilteredCubeMap128, fixedReflDir, bias) ).rgb;

    data.reflection += vec4(refl, material_reflectionFactor);
}

