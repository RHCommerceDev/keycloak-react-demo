@Library('jenkins-rhapsody-libraries@master') _ //Importing shared Libraries
import com.rh.rhapsody.*;

rhapsodyUtils.standardPipelineProperties();
Service s = Service.KEYCLOAK_REACT_DEMO;
DockerBuildPipeline pipeline = new DockerBuildPipeline(this, s, env, "1.0.0");


pipeline.standardTemplate { label ->
try {
  node(label) {
    stage ('Init') {
        pipeline.checkoutCode()
    }
    stage('Create Docker images') {
      sh "pwd; ls -l"
      pipeline.publishAppImage();
    } // end stage
    stage('Tagging Config') {
      pipeline.tagConfiguration();
    } // end stage
  } // end Node
} catch (Exception e) {
  Notification notification = new Notification(this, s, Environment.DEV);
  notification.notifyBuildFailure(env);
  throw e;
}
} // pipelineTemplate

// This is outside of the node (pod)
stage("promote to Dev") {
  pipeline.promoteToEnv(pipeline.getImageTag(), Environment.DEV);
}

