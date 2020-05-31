import React from "react";
import "./Header.css";

function Header({ confirmed, recovered, death }) {
  return (
    <div class="header bg-secondary">
    <div class="container-fluid">
        <div class="header-body">
        <div class="row">
            <div class="col-xl-3 col-lg-6">
            <div class="card shadow card-stats mb-4 mb-xl-0 fade-in-top">
                <div class="card-body ">
                <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Confirmed</h5>
                    <span class="h2 font-weight-bold mb-0">{ confirmed }</span>
                    </div>
                    <div class="col-auto">
                    <div class="icon icon-shape bg-primary text-white rounded-circle shadow">
                        <i class="fas fa-virus"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="col-xl-3 col-lg-6">
            <div class="card shadow card-stats mb-4 mb-xl-0 fade-in-top">
                <div class="card-body ">
                <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Recovered</h5>
                    <span class="h2 font-weight-bold mb-0">{ recovered }</span>
                    </div>
                    <div class="col-auto">
                    <div class="icon icon-shape bg-green text-white rounded-circle shadow">
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="col-xl-3 col-lg-6">
            <div class="card shadow card-stats mb-4 mb-xl-0 fade-in-top">
                <div class="card-body ">
                <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Deaths</h5>
                    <span class="h2 font-weight-bold mb-0">{ death }</span>
                    </div>
                    <div class="col-auto">
                    <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i class="fa fa-skull-crossbones"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
}

export default Header;
