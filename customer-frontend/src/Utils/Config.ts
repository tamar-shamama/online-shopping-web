class Config {

}

class DevelopmentConfig extends Config {

    // public loginUrl = "http://localhost:8080/login/";
    // public adminUrl = "http://localhost:8080/api/admin/";
    public customerUrl = "http://localhost:8080/api/customer/";
    // public imagesUrl = "http://localhost:8080/api/file/";
}

class ProductionConfig extends Config {
    
    // public loginUrl = "http://tmp.com/login/";
    // public adminUrl = "http://tmp.com/api/admin/";
    public customerUrl = "http://tmp.com/api/customer/";
    // public imagesUrl = "http://tmp.com/api/file/";
}

const appConfig =
    process.env.NODE_ENV === "development"
        ? new DevelopmentConfig()
        : new ProductionConfig();


export default appConfig;