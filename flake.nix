{
  description = "not-grocy's development flake";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let pkgs = nixpkgs.legacyPackages.${system}; in
        {
          devShell = pkgs.mkShell {
            nativeBuildInputs = [
              pkgs.gnumake
              pkgs.nodejs-16_x
              pkgs.yarn
              pkgs.php74
              pkgs.php74Packages.composer
            ];
          };
        }
      );
}
