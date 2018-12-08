FROM microsoft/dotnet:2.1-sdk AS compiler

COPY src /build

WORKDIR /build/DAP.Web.Api

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.1-aspnetcore-runtime
COPY --from=compiler /build/DAP.Web.Api/out ./DAP.Web.Api

WORKDIR /DAP.Web.Api

ENTRYPOINT ["dotnet", "DAP.Web.Api.dll"]