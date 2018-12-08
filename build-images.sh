VERSION="latest"

echo building ${VERSION}
docker build -f ./src/DAP.Web.Api.Dockerfile -t dap/web.api:${VERSION} .
docker build -f ./src/DAP.Web.App.Dockerfile -t dap/web.app:${VERSION} .
echo built