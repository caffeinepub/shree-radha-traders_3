import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  type Product = {
    id : Text;
    name : Text;
    description : Text;
    category : Text;
    price : Nat;
    image : Storage.ExternalBlob;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  type Banner = {
    id : Text;
    image : Storage.ExternalBlob;
    link : Text;
  };

  type Inquiry = {
    id : Text;
    name : Text;
    phone : Text;
    message : Text;
    status : InquiryStatus;
    timestamp : Int;
  };

  type InquiryStatus = {
    #new;
    #inProgress;
    #resolved;
    #archived;
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
  };

  let categories = [
    "Fancy Potlis",
    "Designer Envelopes",
    "Wedding Pouches",
    "Jute Bags",
    "Return Gifts",
    "Corporate Gifting Options",
  ];

  let products = Map.empty<Text, Product>();
  let banners = Map.empty<Text, Banner>();
  let inquiries = Map.empty<Text, Inquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type ProductInput = {
    name : Text;
    description : Text;
    category : Text;
    price : Nat;
    image : Storage.ExternalBlob;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public shared ({ caller }) func addProduct(product : ProductInput) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let productId = generateProductId();
    let newProduct : Product = {
      id = productId;
      name = product.name;
      description = product.description;
      category = product.category;
      price = product.price;
      image = product.image;
    };
    products.add(productId, newProduct);
    productId;
  };

  public shared ({ caller }) func updateProduct(productId : Text, product : ProductInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?_existing) {
        let updatedProduct : Product = {
          id = productId;
          name = product.name;
          description = product.description;
          category = product.category;
          price = product.price;
          image = product.image;
        };
        products.add(productId, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(productId)) {
      Runtime.trap("Product not found");
    };

    products.remove(productId);
  };

  // Banner Management
  public shared ({ caller }) func addBanner(image : Storage.ExternalBlob, link : Text) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add banners");
    };

    let bannerId = generateBannerId();
    let newBanner : Banner = {
      id = bannerId;
      image;
      link;
    };
    banners.add(bannerId, newBanner);
    bannerId;
  };

  public shared ({ caller }) func updateBanner(bannerId : Text, image : Storage.ExternalBlob, link : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update banners");
    };

    switch (banners.get(bannerId)) {
      case (null) {
        Runtime.trap("Banner not found");
      };
      case (?_existing) {
        let updatedBanner : Banner = {
          id = bannerId;
          image;
          link;
        };
        banners.add(bannerId, updatedBanner);
      };
    };
  };

  public shared ({ caller }) func deleteBanner(bannerId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete banners");
    };

    if (not banners.containsKey(bannerId)) {
      Runtime.trap("Banner not found");
    };

    banners.remove(bannerId);
  };

  // Inquiry Management
  public shared ({ caller }) func addInquiry(name : Text, phone : Text, message : Text) : async Text {
    // Allow guests to submit inquiries (contact form is public)
    if (phone.isEmpty() or message.isEmpty()) {
      Runtime.trap("Phone and message are required");
    };

    let inquiryId = generateTimestamp().toText();
    let newInquiry : Inquiry = {
      id = inquiryId;
      name;
      phone;
      message;
      status = #new;
      timestamp = generateTimestamp();
    };

    inquiries.add(inquiryId, newInquiry);
    inquiryId;
  };

  public shared ({ caller }) func updateInquiryStatus(inquiryId : Text, status : InquiryStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update inquiries");
    };

    switch (inquiries.get(inquiryId)) {
      case (null) {
        Runtime.trap("Inquiry not found");
      };
      case (?inquiry) {
        let updatedInquiry : Inquiry = {
          id = inquiry.id;
          name = inquiry.name;
          phone = inquiry.phone;
          message = inquiry.message;
          status;
          timestamp = inquiry.timestamp;
        };
        inquiries.add(inquiryId, updatedInquiry);
      };
    };
  };

  public shared ({ caller }) func deleteInquiry(inquiryId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };

    if (not inquiries.containsKey(inquiryId)) {
      Runtime.trap("Inquiry not found");
    };

    inquiries.remove(inquiryId);
  };

  // Query Functions
  public query ({ caller }) func getAllProducts() : async [Product] {
    // Public access for product gallery
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    // Public access for category browsing
    products.values().toArray().sort().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public query ({ caller }) func getAllBanners() : async [Banner] {
    // Public access for homepage banners
    banners.values().toArray();
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray();
  };

  public query ({ caller }) func getCategories() : async [Text] {
    // Public access for category list
    categories;
  };

  public query ({ caller }) func getProduct(productId : Text) : async Product {
    // Public access for product details
    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?product) {
        product;
      };
    };
  };

  public query ({ caller }) func getBanner(bannerId : Text) : async Banner {
    // Public access for banner details
    switch (banners.get(bannerId)) {
      case (null) {
        Runtime.trap("Banner not found");
      };
      case (?banner) {
        banner;
      };
    };
  };

  public query ({ caller }) func getInquiry(inquiryId : Text) : async Inquiry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };

    switch (inquiries.get(inquiryId)) {
      case (null) {
        Runtime.trap("Inquiry not found");
      };
      case (?inquiry) {
        inquiry;
      };
    };
  };

  // Helper Functions
  func generateProductId() : Text {
    "product_" # generateTimestamp().toText();
  };

  func generateBannerId() : Text {
    "banner_" # generateTimestamp().toText();
  };

  func generateTimestamp() : Int {
    0;
  };
};
