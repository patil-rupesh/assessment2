import { HttpClient } from "@angular/common/http";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: Product[];
  product: Product;
  _id: String;
  Product_Id: String;
  Name: String;
  details: String;
  isPackage: Boolean;
  noSubProducts: Number;
  subProducts: [String];
  createdAt: String;
  updatedAt: String;

  clicked_Id="";
  prId="";
  subProductId="";
  

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  addProduct() {

    var numberSubProducts = this.noSubProducts;
    var subproducts = [];

    for(var i=0;i<numberSubProducts;i++)
    {
      var ranNo = Math.floor(Math.random()*999);
      //subproducts += "Pid"+(ranNo)+",";
      var subProdNo = "Pid"+ranNo;
      subproducts.push(subProdNo);
    }
    var pr_Id = "";
    
    
    const newProduct = {
      Product_Id: this.Product_Id,
      Name: this.Name,
      details: this.details,
      isPackage: this.isPackage,
      noSubProducts: numberSubProducts,
      subProducts: subproducts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    this.productService.addProduct(newProduct).subscribe(
      (product: Product) => {
        this.products.push(product);
      },
      err => console.log(err)
    );

    window.location.reload();
  }

  addSubProduct(prId:any)
  {
    var numberSubProducts = this.noSubProducts;
    var subproducts = [];

    for(var i=0;i<numberSubProducts;i++)
    {
      var ranNo = Math.floor(Math.random()*999);
      //subproducts += "Pid"+(ranNo)+",";
      var subProdNo = "Pid"+ranNo;
      subproducts.push(subProdNo);
    }
    var pr_Id = "";
    
    
    const newProduct = {
      Product_Id: prId,
      Name: this.Name,
      details: this.details,
      isPackage: this.isPackage,
      noSubProducts: numberSubProducts,
      subProducts: subproducts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    this.productService.addProduct(newProduct).subscribe(
      (product: Product) => {
        this.products.push(product);
      },
      err => console.log(err)
    );

    window.location.reload();
  }

  updateForm(id:any)
  {
  
    let dispElements = document.getElementsByClassName("onDisplay["+id+"]") as HTMLCollectionOf<HTMLElement>;
    let editableElements = document.getElementsByClassName("editable["+id+"]") as HTMLCollectionOf<HTMLElement>;

    for(var k=0;k<dispElements.length;k++)
    {
      dispElements[k].style.display = "none";
      editableElements[k].style.display = "inline";
    }

    document.getElementById("edit["+id+"]").style.display="none";
    document.getElementById("delete["+id+"]").style.display="none";

    document.getElementById("saveUpdate["+id+"]").style.display="inline";
    document.getElementById("cancel["+id+"]").style.display="inline";

  }

  undoUpdate(id:any)
    {
      let dispElements = document.getElementsByClassName("onDisplay["+id+"]") as HTMLCollectionOf<HTMLElement>;
      let editableElements = document.getElementsByClassName("editable["+id+"]") as HTMLCollectionOf<HTMLElement>;

      for(var k=0;k<dispElements.length;k++)
      {
        dispElements[k].style.display = "inline";
        editableElements[k].style.display = "none";
      }

      document.getElementById("edit["+id+"]").style.display="inline";
      document.getElementById("delete["+id+"]").style.display="inline";

      document.getElementById("saveUpdate["+id+"]").style.display="none";
      document.getElementById("cancel["+id+"]").style.display="none";
      this.productService.getProducts().subscribe((products: Product[])=>this.products = products,(err)=>{
        console.log('error occured');
      });

    }
    
    
    
    addsubProductForm(id:any,clickedId:any)
    {
      //let pid = document.getElementById("product_Id") as HTMLElement;
      
      this.clicked_Id = clickedId;
      this.prId = id;
      this.productService.findProduct(id).subscribe((product:Product)=>{
        this.product = product
        console.log(product);
      },(err)=>{
          console.log("Error in getting product");
        }
      );

      var subProductForm = document.getElementById('addSubProduct');

      //document.getElementById("product_Id").value=clickedId;
     
      // if (subProductForm.style.display === "none") {
      //   subProductForm.style.display = "block";
      // } else {
      //   subProductForm.style.display = "none";
      // }

   
    }

  updateProduct(id: any) {
    const newproduct = {
      _id: this._id,
      Product_Id: this.Product_Id,
      Name: this.Name,
      details: this.details,
      isPackage: this.isPackage,
      subProducts: this.subProducts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
    var products = this.products;

    this.productService.updateProduct(id, newproduct).subscribe(
      (product: Product) => {
        for (var i = 0; i < products.length; i++) {
          if (products[i]._id == id) {
            products.splice(i, 1);
            products.push(product);
          }
        }

        this.productService
          .getProducts()
          .subscribe((products: Product[]) => (this.products = products));
      },
      err => console.log(err)
    );

    window.location.reload();
  }

  deleteProduct(id: any) {
    var products = this.products;
    this.productService.deleteProduct(id).subscribe(data => {
      for (var i = 0; i < products.length; i++) {
        if (products[i]._id == id) {
          products.splice(i, 1);
        }
      }
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => (this.products = products),
      err => {
        console.log("error occured");
      }
    );
  }
}
