# My demo with playwright!

In this repository will go to implement various features with this framework.


# Features of playwright

 - **Locators:**
 - **Navigations** 
 - **Assertion**
 - **Fill**
 - **setViewportSize**
 - **Intercept**
 - **Pause**
 - **Screenshots**
 - **File Env**


## The project implements pattern POM

```mermaid
graph LR
    A[Init] --> B[Create Page Object]
    B --> C[Define Methods]
    C --> D[Implement Interaction Methods]
    D --> E[Create Tests]
    E --> F[Use Page Objects in Testing]
    F --> G[Run Tests]

    subgraph Page Object
        B
        C
        D
    end
    
    subgraph Pruebas
        E
        F
        G
    end

```