using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NotesAPI.Classes.Connections;
using System;
using System.IO;

namespace NoteAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // Adds our connection information
            if (File.Exists(Settings.GetFileName()))
            {
                Settings.Load();
                Console.WriteLine(Settings.Connection);
            }
            else
            {
                Settings.Create();
                Environment.Exit(0);
            }
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://rohzek.cf",
                                        "http://www.rohzek.cf",
                                        "http://rohzek.cf:8080",
                                        "http://www.rohzek.cf:8080",
                                        "http://localhost",
                                        "http://localhost:9000",
                                        "http://*",
                                        "http://*.*",
                                        "http://*.*:*");
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.Build();
                });

                options.AddDefaultPolicy(
                builder =>
                {
                    builder.WithOrigins("http://rohzek.cf",
                                        "http://www.rohzek.cf",
                                        "http://rohzek.cf:8080",
                                        "http://www.rohzek.cf:8080",
                                        "http://localhost",
                                        "http://localhost:9000",
                                        "http://*",
                                        "http://*.*",
                                        "http://*.*:*");
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.Build();
                });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors();
            app.UseCors(MyAllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
