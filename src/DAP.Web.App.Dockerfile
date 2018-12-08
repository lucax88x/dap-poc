FROM microsoft/dotnet:2.1-sdk AS compiler

COPY src /build

WORKDIR /build/DAP.Web.App

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.1-aspnetcore-runtime
COPY --from=compiler /build/DAP.Web.App/out ./DAP.Web.App

WORKDIR /DAP.Web.App

ENTRYPOINT ["dotnet", "DAP.Web.App.dll"]