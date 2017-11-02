package com.passap.angularboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.util.List;
import java.util.LinkedList;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    http.cors().and()
	      .authorizeRequests()
          	.antMatchers("/").permitAll()
          	.anyRequest().authenticated()
          	.and()
          .formLogin()
	          .loginPage("/user")
	          .permitAll().and()
//	          .defaultSuccessUrl("/dashboard")
//	          .failureUrl("/login?error=true")
//	          .and()
//	      .logout()
//	          .permitAll()
//	  		  .logoutSuccessUrl("/login")
//	  		  .and()
	  	  .csrf().disable();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		List<String> ori = new LinkedList<String>();
		ori.add("*");
		List<String> met = new LinkedList<String>();
		met.add("HEAD");
		met.add("GET");
		met.add("POST");
		met.add("PUT");
		met.add("DELETE");
		met.add("PATCH");
		List<String> hea = new LinkedList<String>();
		hea.add("Authorization");
		hea.add("Cache-Control");
		hea.add("Content-Type");
	    final CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(ori);
	    configuration.setAllowedMethods(met);
	    // setAllowCredentials(true) is important, otherwise:
	    // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
	    configuration.setAllowCredentials(true);
	    // setAllowedHeaders is important! Without it, OPTIONS preflight request
	    // will fail with 403 Invalid CORS request
	    configuration.setAllowedHeaders(hea);
	    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}
    
  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth
          .inMemoryAuthentication()
              .withUser("user").password("password").roles("USER");
  }

}